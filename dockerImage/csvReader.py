import pandas as pd


class CSVReader:
    def __init__(self, page_number=1, csv_file='./data/cleanme.csv'):
        self.page_number = page_number
        self.df = pd.read_csv(csv_file)
        self.total_pages = (len(self.df) + 9) // 10
        self.df.fillna('?', inplace=True)

    def get_total_pages (self):
        return self.total_pages
    def csv_pages(self):
        start_index = (self.page_number - 1) * 10
        end_index = self.page_number * 10
        page_df = self.df.iloc[start_index:end_index]
        page_data = page_df.to_dict('records')
        return page_data
