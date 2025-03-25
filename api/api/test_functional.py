from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

class FunctionalTests(StaticLiveServerTestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_user_can_login(self):
        self.browser.get(self.live_server_url + '/admin/')
        time.sleep(1)

        username_field = self.browser.find_element_by_name('username')
        password_field = self.browser.find_element_by_name('password')

        username_field.send_keys('admin')
        password_field.send_keys('password')
        password_field.send_keys(Keys.RETURN)

        time.sleep(1)
        self.assertIn('Dashboard', self.browser.title)
