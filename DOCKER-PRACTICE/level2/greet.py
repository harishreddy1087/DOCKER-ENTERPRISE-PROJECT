import os
# Pull from ENV
dept = os.getenv("DEPT_NAME", "Unknown")
version = os.getenv("VERSION", "0.0.0")

print(f"Hello from {dept} department. Running version {version}.")