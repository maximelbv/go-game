import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from core.models import Game

BASE_URL = "https://homepages.cwi.nl/~aeb/go/games/games/"

class Command(BaseCommand):
    help = "Importe une portion des parties de Go au format SGF depuis une source publique"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE(f"Analyse de la page principale {BASE_URL}..."))
        
        try:
            response = requests.get(BASE_URL, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")

            subfolders = [a["href"].replace("index.html", "") for a in soup.find_all("a", href=True) if "index.html" in a["href"]]

        except requests.RequestException as e:
            self.stdout.write(self.style.ERROR(f"Échec de l'accès à {BASE_URL} ({e})"))
            return
        
        count = 0
        for subfolder in subfolders[:3]:
            folder_url = BASE_URL + subfolder
            self.stdout.write(self.style.NOTICE(f"Exploration du dossier {folder_url}..."))
            
            try:
                folder_response = requests.get(folder_url, timeout=10)
                folder_response.raise_for_status()
                folder_soup = BeautifulSoup(folder_response.text, "html.parser")

                sgf_files = [a["href"] for a in folder_soup.find_all("a", href=True) if a["href"].endswith(".sgf")]


            except requests.RequestException as e:
                self.stdout.write(self.style.ERROR(f"Échec de l'accès au dossier {folder_url} ({e})"))
                continue
            
            for sgf_file in sgf_files[:5]:
                file_url = folder_url + sgf_file
                self.stdout.write(self.style.NOTICE(f"Téléchargement de {file_url}..."))
                
                try:
                    sgf_response = requests.get(file_url, timeout=10)
                    sgf_response.raise_for_status()
                    sgf_data = sgf_response.text
                except requests.RequestException as e:
                    self.stdout.write(self.style.ERROR(f"Échec du téléchargement : {file_url} ({e})"))
                    continue
                
                game, created = Game.objects.get_or_create(
                    sgf_data=sgf_data,
                    defaults={"result": "unknown"}
                )
                
                if created:
                    count += 1
        
        self.stdout.write(self.style.SUCCESS(f"Importation terminée : {count} nouvelles parties ajoutées."))
