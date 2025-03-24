import requests
from django.core.management.base import BaseCommand
from core.models import Problem

BASE_URL = "https://raw.githubusercontent.com/sanderland/tsumego/refs/heads/master/problems/1a.%20Tsumego%20Beginner/Cho%20Chikun%20Encyclopedia%20Life%20And%20Death%20-%20Elementary/"
FILES = [f"Prob{str(i).zfill(4)}.json" for i in range(1, 10)]


class Command(BaseCommand):
    help = "Importe des problèmes de tsumego depuis un dossier JSON public"

    def handle(self, *args, **kwargs):
        count = 0

        for file in FILES:
            url = BASE_URL + file
            self.stdout.write(self.style.NOTICE(f"Téléchargement de {file}"))

            try:
                response = requests.get(url, timeout=10)
                response.raise_for_status()  
                data = response.json()
            except requests.RequestException as e:
                self.stdout.write(self.style.ERROR(f"Échec du téléchargement : {file} ({e})"))
                continue
            except ValueError:
                self.stdout.write(self.style.ERROR(f"Erreur de parsing JSON : {file}"))
                continue

            problem_number = file.replace("Prob", "").replace(".json", "")
            base_title = data.get("C", "Tsumego Problem")
            unique_title = f"{base_title} #{problem_number}"  

            problem_obj, created = Problem.objects.update_or_create(
                title=unique_title,
                defaults={"difficulty": data.get("difficulty", "unknown"), "json_data": data},
            )

            if created:
                count += 1

        self.stdout.write(self.style.SUCCESS(f"Importation terminée : {count} nouveaux problèmes ajoutés."))
