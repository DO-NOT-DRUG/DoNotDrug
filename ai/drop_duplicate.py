import pandas as pd

def main():
    url = '마약사전1.csv'   # 중복제거할 파일

    f = pd.read_csv(url, encoding='utf-8-sig')
    print("중복값 제거 전", f.shape)
    # 중복값 제거
    f.drop_duplicates('Tweet', keep='first', ignore_index=True, inplace=True)
    print("중복값 제거 후", f.shape)

    f.to_csv(url, mode='w', index=False, encoding='utf-8-sig')

if __name__ == "__main__":
    main()