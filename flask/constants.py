from utils import *

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
S3_BUCKET = os.getenv('S3_BUCKET')
APP_NAME = os.getenv('APP_NAME')

s3 = boto3.client(
    's3',
    region_name='ap-south-1',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    config=boto3.session.Config(signature_version='s3v4')
)

console = Console()