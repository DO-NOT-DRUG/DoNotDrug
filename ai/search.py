import asyncio
from twscrape import API
import pandas as pd
import os

async def main():
    if os.path.isfile('accounts.db'):
        os.remove('accounts.db')

    api = API()  # or API("path-to.db") - default is `accounts.db`

    # Shell commmand 실행해서 로그인
    os.system('twscrape add_accounts accounts.txt username:password:email:email_password')
    os.system('twscrape login_accounts')
    # # 메소드 이용해서 로그인
    # await api.pool.add_account("username", "password", "email", "email_password")
    # await api.pool.login_all()

    word = "케이" # Search word
    # keyword_list = [
    # "드러그",
    # "케이",
    # "떨",
    # "MDMA",
    # "러미나",
    # "GHB"]
    
    # for word in keyword_list:
        
    tweets = []
    async for tweet in api.search(word, limit = 1000):
        # get links
        links = [tl.tcourl for tl in tweet.links]
        link = ', '.join(links)
        # 트윗 날짜, 유저아이디, 유저, 닉네임, 트윗내용, 트윗 내 링크, 트윗url
        tweets.append([tweet.date, tweet.user.username, tweet.user.displayname, tweet.rawContent, link, tweet.url])
    df = pd.DataFrame(tweets, columns=['Date','User','Nickname', 'Tweet', 'Link', 'URL']) # 데이터 컬럼명 지정
    # 중복 제거
    df.drop_duplicates(keep='first', ignore_index=True, inplace=True)
    # export to csv
    if not os.path.exists('search'):  # make /user if not exists
        os.mkdir('search')
    path = 'search/' + word + '.csv'
    if not os.path.exists(path):
        df.to_csv(path, mode='w', index=False, encoding='utf-8-sig')
    else:
        df.to_csv(path, mode='a', index=False, encoding='utf-8-sig', header=False)

if __name__ == "__main__":
    asyncio.run(main())