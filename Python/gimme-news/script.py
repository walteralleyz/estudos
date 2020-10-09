from selenium import webdriver
# from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from json import dumps

from time import sleep
from sys import argv

class Driver:
    browser = ''
    uri = ''
    # options = Options()

    def __init__(self):
        # self.options.add_argument('--headless')
        # self.options.add_argument('--disable-gpu')
        # self.options.add_argument('--no-sandbox')

        self.browser = webdriver.Firefox(executable_path=r'./geckodriver'
        # , firefox_options=self.options
        )

    def set_uri(self, uri):
        self.uri = uri

    def go_to_uri(self):
        self.browser.get(self.uri)
    
    def __del__(self):
        sleep(3)
        self.browser.close()

class DriverStarter(Driver):
    globo = []
    yahoo = []
    bing  = []


    def __init__(self):
        super().__init__()

    def get_from_globo(self, message):
        self.set_uri(f'https://g1.globo.com/busca/?q={message}')
        self.go_to_uri()

        self.get_news(
            '.widget--info__title', 
            '.widget--info__description',
            '.widget--info__text-container a',
            self.globo
        )

    def get_from_yahoo(self, message):
        self.set_uri(f'https://br.news.search.yahoo.com/search;?p={message}')
        self.go_to_uri()

        self.get_news(
            '.s-title', 
            '.s-desc',
            '.s-title a',
            self.yahoo
        )

    def get_from_bing(self, message):
        self.set_uri(f'https://www.bing.com/news/search?q={message}')
        self.go_to_uri()

        self.get_news(
            '.title',
            '.snippet',
            '.title',
            self.bing
        )

    def expect_to_elem(self, elem_class):
        elem = WebDriverWait(self.browser, 10).until(EC.visibility_of_all_elements_located((By.CSS_SELECTOR, elem_class)))

        return elem

    def get_news(self, title_class, content_class, link_class, source):
        try:
            links = self.expect_to_elem(link_class)
            titles = self.expect_to_elem(title_class)
            contents = self.expect_to_elem(content_class)

            for index in range(len(titles)):
                splitted_text = titles[index].text.split()
                
                if len(splitted_text) >= 10:
                    source.append({ 
                        'title': titles[index].text, 
                        'content': contents[index].text, 
                        'link': links[index].get_attribute('href') 
                    })
        except Exception:
            pass

    def return_news(self):
        print(dumps({'globo': self.globo, 'yahoo': self.yahoo, 'bing': self.bing}))


client = DriverStarter()
client.get_from_globo(argv[1])
client.get_from_yahoo(argv[1])
client.get_from_bing(argv[1])

client.return_news()
