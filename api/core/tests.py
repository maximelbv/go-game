from django.test import TestCase
from django.contrib.auth.models import User
from core.models import UserProfile, Problem, ProblemAttempt, Game, GameStatistics

class ModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.profile = UserProfile.objects.create(user=self.user, level='Intermédiaire', rating=100)
        self.problem = Problem.objects.create(title='Problem 1', difficulty='Facile', json_data={})
        self.attempt = ProblemAttempt.objects.create(user=self.user, problem=self.problem, is_solved=True)
        self.game = Game.objects.create(sgf_data='game data', user=self.user, result='Win')
        self.stats = GameStatistics.objects.create(total_games=1, total_problems_solved=1)

    def test_user_profile_creation(self):
        self.assertEqual(UserProfile.objects.count(), 1)
        self.assertEqual(self.profile.level, 'Intermédiaire')
        self.assertEqual(self.profile.rating, 100)

    def test_problem_creation(self):
        self.assertEqual(Problem.objects.count(), 1)
        self.assertEqual(self.problem.title, 'Problem 1')

    def test_problem_attempt_creation(self):
        self.assertEqual(ProblemAttempt.objects.count(), 1)
        self.assertTrue(self.attempt.is_solved)

    def test_game_creation(self):
        self.assertEqual(Game.objects.count(), 1)
        self.assertEqual(self.game.result, 'Win')

    def test_game_statistics_creation(self):
        self.assertEqual(GameStatistics.objects.count(), 1)
        self.assertEqual(self.stats.total_games, 1)

