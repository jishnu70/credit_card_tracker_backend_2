from pathlib import Path
import os
from datetime import timedelta
from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Function to get environment variables safely
def get_env_variable(var_name, default=None, required=True):
    """Get an environment variable or raise an error if required and missing"""
    value = os.getenv(var_name, default)
    if required and value is None:
        raise ImproperlyConfigured(f"Set the {var_name} environment variable")
    return value

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Security Key
SECRET_KEY = get_env_variable("DJANGO_SECRET_KEY")

# Debug Mode (Default: False)
DEBUG = get_env_variable("DJANGO_DEBUG", "False") == "True"

# Allowed Hosts (for production, specify domain names)
ALLOWED_HOSTS = get_env_variable("DJANGO_ALLOWED_HOSTS", "127.0.0.1,localhost").split(",")

# Django REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated"
    ],
}

# JWT settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=10),
    "REFRESH_TOKEN_LIFETIME": timedelta(minutes=30),
}

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    "rest_framework",
    "ninja",
    "corsheaders",

    "api",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'cardBackend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cardBackend.wsgi.application'

# Using default SQLite database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static & Media Files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media/'

# Security settings for production
SECURE_SSL_REDIRECT = not DEBUG  # Redirect HTTP to HTTPS if not in debug mode
SESSION_COOKIE_SECURE = not DEBUG  # Secure cookies only in production
CSRF_COOKIE_SECURE = not DEBUG  # CSRF cookie only over HTTPS
SECURE_BROWSER_XSS_FILTER = True  # Protect against XSS
SECURE_CONTENT_TYPE_NOSNIFF = True  # Prevent MIME-type sniffing

# CORS settings (Allow only specified origins)
CORS_ALLOWED_ORIGINS = get_env_variable("CORS_ALLOWED_ORIGINS", "").split(",")
CORS_ALLOW_CREDENTIALS = True

# Append trailing slash to URLs
APPEND_SLASH = True

# Logging configuration (Logs errors in production)
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'logs/django_errors.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
