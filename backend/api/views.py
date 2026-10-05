from django.http import JsonResponse
import os


def health(request):
    return JsonResponse({
        "status": "ok",
        "items": [
            "Configurar Docker",
            "Automatizar CI",
            "Publicar no GHCR",
        ],
    })
