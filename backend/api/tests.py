from django.test import TestCase


class HealthEndpointTests(TestCase):
    def test_health_returns_ok_status(self):
        response = self.client.get('/api/health/')
        self.assertEqual(response.status_code, 200)

    def test_health_payload_shape(self):
        response = self.client.get('/api/health/')
        data = response.json()
        self.assertEqual(data['status'], 'ok')
        self.assertIn('items', data)
        self.assertIsInstance(data['items'], list)
