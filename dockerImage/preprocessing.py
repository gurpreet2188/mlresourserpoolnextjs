import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer


class Preprocessing:

    def __init__(self, csv, dropNA=False, replace=False, columnFilter=[], rowFilter=[], rowFilterColmun='',
                 targetColumn=""):

        self.X = []
        self.y = []
        self.csv = csv
        self.dropNA = dropNA
        self.replace = replace
        self.columnFilter = columnFilter
        self.rowFilter = rowFilter
        self.rowFilterColumn = rowFilterColmun
        self.targetColumn = targetColumn

    def cleanCSV(self, type):
        self.X = pd.read_csv(self.csv)

        if type == 'row':
            if self.dropNA:
                self.X = self.X.dropna()
            if len(self.rowFilter) > 0:
                lowCasedRows = [v.lower() for v in self.rowFilter]
                # lowerCasedColumn = self.rowFilterColumn.lower()
                self.X[self.rowFilterColumn] = self.X[self.rowFilterColumn].str.lower()
                self.X = self.X[~self.X[self.rowFilterColumn].isin(lowCasedRows)]
                self.X[self.rowFilterColumn] = self.X[self.rowFilterColumn].str.title()

        elif type == 'column':
            if len(self.columnFilter) > 0:
                self.X = self.X.drop(self.columnFilter, axis=1)
        elif type == 'combine':
            if len(self.columnFilter) > 0:
                self.X = self.X.drop(self.columnFilter, axis=1)
            if self.dropNA:
                self.X = self.X.dropna()
            if len(self.rowFilter) > 0:
                self.X = self.X[~self.X[self.rowFilterColumn].isin(self.rowFilter)]

        df = pd.DataFrame(self.X)

        if type == 'column':
            df.to_csv('./cleaned/columnFilter.csv', encoding='utf-8')
        elif type == 'row':
            df.to_csv('./cleaned/rowFilter.csv', encoding='utf-8')
        else:
            df.to_csv('./cleaned/rowColumnFilter.csv', encoding='utf-8')


    def prepare_data(self):
        self.X = pd.read_csv(self.csv)

        # if self.dropNA:
        #     self.X = self.X.dropna()
        #
        # if self.replace:
        #     pass

        self.y = self.X[self.targetColumn]
        self.X = self.X.drop(self.targetColumn, axis=1 )
        # if len(self.columnFilter) > 0:
        #     self.X = self.X.drop(self.columnFilter, axis=1)

        # df = pd.DataFrame(self.X)
        # columnRename = {self.targetColumn : f"target_{self.targetColumn}"}
        # for col in self.targetColumn:
        #     columnRename[col] = f"target_{col}"
        # print(columnRename)
        # df.rename(columnRename, axis='columns', inplace=True)

        # df.rename(columnRename, axis='columns', inplace=True)
        # df.to_csv('./cleaned/csvReady.csv', encoding='utf-8')
        # find non-number columns
        nonNumberCols = []
        for col in self.X.columns:
            if self.X[col].dtype == 'object':
                nonNumberCols.append(col)

        if len(nonNumberCols) > 0:
            oneHot = OneHotEncoder()
            transformer = ColumnTransformer([('one_hot', oneHot, nonNumberCols)], remainder="passthrough")
            self.X = transformer.fit_transform(self.X)

        return self.X, self.y
