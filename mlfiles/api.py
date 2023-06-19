# from typing import Any
import json

import aiofiles
import os, shutil
from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi import BackgroundTasks
from apiPaths import Paths
from knn import KNNRegressor, KNNClassifier
from preprocessing import Preprocessing
from mlcelery import train
from csvReader import CSVReader
from celery.result import AsyncResult


class API(FastAPI):
    def __init__(self):
        super().__init__()

        self.X = []
        self.y = []
        self.add_api_route(path=Paths.root, endpoint=self.root, methods=["GET"])
        self.add_api_route(path=Paths.csv_pages, endpoint=self.csv_pages, methods=['POST'])
        self.add_api_route(path=Paths.preprocess_csv, endpoint=self.preprocess_csv, methods=['POST'])
        # self.add_api_route(path=Paths.knnParams, endpoint=self.knnParams, methods=["GET"])
        self.add_api_route(path=Paths.fileUpload, endpoint=self.fileUpload, methods=["POST"])
        # self.add_api_route(path=Paths.preporcessing, endpoint=self.preprocessing, methods=["POST"])
        # self.add_api_route(path=Paths.train, endpoint=self.train, methods=["POST"])
        self.add_api_route(path=Paths.start_train, endpoint=self.start_train, methods=["POST"])
        self.add_api_route(path=Paths.track_ml_progress, endpoint=self.track_ml_progress, methods=["POST"])
        # self.knnReg = KNNRegressor()
        # self.knnClass = KNNClassifier()

    @staticmethod
    async def root() -> JSONResponse:
        return JSONResponse({"Python Backend": "Working!"})

    @staticmethod
    async def csv_pages(request: Request) -> JSONResponse:
        body = await request.json()
        if ('page_number' in body):
            page_number = int(body['page_number'], )
            if (body["connectedWith"] == 'csv'):
                csv_reader = CSVReader(page_number=page_number)
                total_pages = csv_reader.get_total_pages()
                return JSONResponse({"total_pages": total_pages, 'page_data': csv_reader.csv_pages()})
            else:
                csv_reader = CSVReader(page_number=page_number, csv_file=f'./cleaned/{body["connectedWith"]}.csv')
                total_pages = csv_reader.get_total_pages()
                return JSONResponse({"total_pages": total_pages, 'page_data': csv_reader.csv_pages()})

    @staticmethod
    async def preprocess_csv(request: Request) -> JSONResponse:
        body = await request.json()

        if body['type'] == 'row':
            preprocess = Preprocessing('./data/cleanme.csv', dropNA=body['drop'], replace=body['replace'],
                                       rowFilter=body['rowFilter'], rowFilterColmun=body['rowFilterColumn'])
            preprocess.cleanCSV(body['type'])
        elif body['type'] == 'column':
            preprocess = Preprocessing('./data/cleanme.csv', columnFilter=body['columns'])
            preprocess.cleanCSV(body['type'])
        elif body['type'] == 'combine':
            preprocess = Preprocessing('./data/cleanme.csv', columnFilter=body['columns'], dropNA=body['drop'],
                                       replace=body['replace'], rowFilter=body['rowFilter'],
                                       rowFilterColmun=body['rowFilterColumn'])
            preprocess.cleanCSV(body['type'])

        return JSONResponse({"msg": "done"})

    # async def knnParams(self) -> JSONResponse:
    #     return JSONResponse(self.knnReg.params())

    @staticmethod
    async def fileUpload(file: UploadFile) -> JSONResponse:
        print(file)
        files = ['columnFilter.csv', 'rowFilter.csv', 'rowColumnFilter.csv']
        res = 'File processing failed, try again'
        try:
            async with aiofiles.open('./data/cleanme.csv', 'wb') as outputFile:
                content = await file.read()
                await outputFile.write(content)

            file_path = './data/cleanme.csv'
            if os.path.exists(file_path):
                for i in files:
                    shutil.copyfile(file_path, f'./cleaned/{i}')
        except Exception as e:
            print(e)
            return JSONResponse({"file": file.filename, "message": res})

        else:
            return JSONResponse({"file": file.filename, "message": "file successfully processed"})

    # async def preprocessing(self, dropna=Form(), replace=Form(), columnFilter=Form(),
    #                         targetColumn=Form()) -> JSONResponse:
    #     columnFilter = columnFilter.split(',')
    #     targetColumn = targetColumn.split(',')
    #     print(columnFilter, targetColumn)
    #     p = "Error"
    #     try:
    #         if './data/cleanme.csv':
    #             # def runML():
    #             #     print(dropna)
    #             #     preprocess = Preprocessing('./data/cleanme.csv', dropNA=dropna, replace=replace,
    #             #                                columnFilter=columnFilter, targetColumn=targetColumn)
    #             #
    #             #     knn = KNNClassifier()
    #             #     X, y = preprocess.clearCSV()
    #             #
    #             #     knn.knnTrain(X, y, split=0.3)
    #
    #             # p = await knn.knnTrain(self.X, self.y, split=0.3)
    #             print("starting bg task")
    #             # ml = KNNClassifier()
    #             print(dropna, replace)
    #             task = train.delay(dropna, replace, columnFilter, targetColumn)
    #             return JSONResponse({"msg": task.id})
    #     except Exception as e:
    #         print(e)
    #         return JSONResponse({"msg": "file error"})


    @staticmethod
    async def start_train(request: Request) -> JSONResponse:
        body = await request.json()
        task = train.delay(body)
        return JSONResponse({"taskID": task.id})

    @staticmethod
    async def track_ml_progress(request: Request) -> JSONResponse:
        body = await request.json()
        try:
            task_result = AsyncResult(body['taskID'], app=train)
            result = {
                "task_id": body['taskID'],
                "task_status": task_result.status,
                "task_result": task_result.get() if task_result.ready() else False
            }
            return JSONResponse(result)
        except:
            result = {
                "task_id": body['taskID'],
                "task_status": "NOTASK",
                "task_result": False
            }
            return JSONResponse(result)

