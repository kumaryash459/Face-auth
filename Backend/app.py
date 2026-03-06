from flask import Flask, request, jsonify
from flask_cors import CORS
from deepface import DeepFace
import base64
import cv2
import numpy as np
import os

app = Flask(__name__)
CORS(app)

DATASET_DIR = "dataset"
TEMP_DIR = "temp"

os.makedirs(DATASET_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

previous_frame = None
motion_counter = 0
liveness_verified = False


def save_base64_image(base64_string, path):

    img_data = base64.b64decode(base64_string.split(",")[1])
    npimg = np.frombuffer(img_data, dtype=np.uint8)
    img = cv2.imdecode(npimg, 1)

    cv2.imwrite(path, img)

    return img


def detect_motion(frame):

    global previous_frame, motion_counter, liveness_verified

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (21, 21), 0)

    if previous_frame is None:
        previous_frame = gray
        return

    frame_diff = cv2.absdiff(previous_frame, gray)
    thresh = cv2.threshold(frame_diff, 25, 255, cv2.THRESH_BINARY)[1]

    motion = np.sum(thresh)

    if motion > 50000:
        motion_counter += 1

    previous_frame = gray

    if motion_counter > 3:
        liveness_verified = True


@app.route("/")
def home():
    return "Face Auth Server Running"


# REGISTER
@app.route("/register", methods=["POST"])
def register():

    data = request.json
    name = data["name"]
    images = data["images"]

    user_folder = os.path.join(DATASET_DIR, name)
    os.makedirs(user_folder, exist_ok=True)

    for i, img in enumerate(images):

        path = os.path.join(user_folder, f"{i}.jpg")
        save_base64_image(img, path)

    return jsonify({"status": "registered"})


# LIVENESS
@app.route("/liveness", methods=["POST"])
def liveness():

    global liveness_verified

    data = request.json
    image = data["image"]

    frame = save_base64_image(image, os.path.join(TEMP_DIR, "login.jpg"))

    detect_motion(frame)

    if liveness_verified:
        return jsonify({"status": "verified"})
    else:
        return jsonify({"status": "pending"})


# LOGIN
@app.route("/login", methods=["POST"])
def login():

    global liveness_verified, motion_counter, previous_frame

    if not liveness_verified:
        return jsonify({"success": False, "message": "Liveness not verified"})

    data = request.json
    image = data["image"]

    login_path = os.path.join(TEMP_DIR, "login.jpg")
    save_base64_image(image, login_path)

    best_match = None
    best_distance = 1.0

    for user in os.listdir(DATASET_DIR):

        user_folder = os.path.join(DATASET_DIR, user)

        for file in os.listdir(user_folder):

            registered_path = os.path.join(user_folder, file)

            try:

                result = DeepFace.verify(
                    img1_path=registered_path,
                    img2_path=login_path,
                    model_name="Facenet",
                    distance_metric="cosine",
                    enforce_detection=True
                )

                distance = result["distance"]

                if distance < best_distance:
                    best_distance = distance
                    best_match = user

            except:
                continue

    # stricter threshold
    if best_distance < 0.4:

        liveness_verified = False
        motion_counter = 0
        previous_frame = None

        return jsonify({
            "success": True,
            "user": best_match
        })

    else:

        liveness_verified = False
        motion_counter = 0
        previous_frame = None

        return jsonify({
            "success": False,
            "message": "Face not recognized"
        })


@app.route("/reset")
def reset():

    global previous_frame, motion_counter, liveness_verified

    previous_frame = None
    motion_counter = 0
    liveness_verified = False

    return jsonify({"status": "reset"})


if __name__ == "__main__":
    app.run(debug=True)