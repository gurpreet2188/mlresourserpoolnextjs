from enum import Enum


class Paths(str, Enum):
    root = "/"
    csv_pages = '/csv-pages'
    preprocess_csv = '/preprocess-csv'
    knnParams = "/knn-params"
    preporcessing = "/preprocess"
    fileUpload = '/file-upload'
    train = '/train'
    start_train = '/start-train'
    track_ml_progress = '/track-ml-progress'
