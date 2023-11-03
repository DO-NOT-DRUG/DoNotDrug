#-*- coding:utf-8 -*-
import urllib3
import json
import config
import pandas as pd

def morpheme_api(text):
    # 언어 분석 (구어)
    openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU_spoken" 
        
    accessKey = config.ACCESS_KEY   # ETRI API Access key
    analysisCode = "ner"            # 언어 분석 코드(ner: 형태소 분석)
        
    requestJson = {  
        "argument": {
            "text": text,
            "analysis_code": analysisCode
        }
    }
        
    http = urllib3.PoolManager()
    response = http.request(
        "POST",
        openApiURL,
        headers={"Content-Type": "application/json; charset=UTF-8", "Authorization" :  accessKey},
        body=json.dumps(requestJson)
    )

    data = json.loads(response.data)
    sentences = data['return_object']['sentence']
    nng = []
    for sentence in sentences:
        for m in sentence['morp']:
            if m['type'] == 'NNG' or m['type'] == 'NNP':    # 일반명사, 고유명사
                nng.append(m['lemma'])
    return nng

def main():
    # File Open
    file_name = "마약사전1.csv" # 분석할 csv 파일
    df = pd.read_csv(file_name)
    Nouns = []
    for idx, row in df.iterrows():
        Nouns.append(morpheme_api(row['Tweet']))    # 형태소 분석
    df['Noun'] = Nouns
    # to csv
    df.to_csv(file_name, mode='w', encoding='utf-8-sig')
    
if __name__ == "__main__":
    main()
