import http.server
import socketserver
import threading
import subprocess
import time
import os
import sys
import tempfile

PORT = 4173
ROOT_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
DIST_DIR = os.path.join(ROOT_DIR, 'dist')

desktop_png = os.path.join(ROOT_DIR, 'dashboard-desktop.png')
mobile_png = os.path.join(ROOT_DIR, 'dashboard-mobile.png')

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)
    def log_message(self, format, *args):
        pass

def main():
    httpd = socketserver.TCPServer(('127.0.0.1', PORT), Handler)
    server_thread = threading.Thread(target=httpd.serve_forever)
    server_thread.daemon = True
    server_thread.start()
    print(f'Static server started at http://127.0.0.1:{PORT}')

    time.sleep(1.5)

    edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
    temp_dir = tempfile.mkdtemp()

    flags = [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-default-browser-check',
        '--hide-scrollbars',
        '--disable-features=RendererCodeIntegrity',
        f'--user-data-dir={temp_dir}'
    ]

    print(f"Capturing desktop to {desktop_png}...")
    cmd_desktop = [
        edge_path,
        *flags,
        '--window-size=1440,1050',
        f'--screenshot={desktop_png}',
        f'http://127.0.0.1:{PORT}'
    ]
    p1 = subprocess.run(cmd_desktop, cwd=ROOT_DIR, capture_output=True, text=True, timeout=30)
    print("Desktop exit code:", p1.returncode)

    print(f"Capturing mobile to {mobile_png}...")
    cmd_mobile = [
        edge_path,
        *flags,
        '--window-size=400,900',
        f'--screenshot={mobile_png}',
        f'http://127.0.0.1:{PORT}'
    ]
    p2 = subprocess.run(cmd_mobile, cwd=ROOT_DIR, capture_output=True, text=True, timeout=30)
    print("Mobile exit code:", p2.returncode)

    httpd.shutdown()
    print("Desktop exists:", os.path.exists(desktop_png), "Size:", os.path.getsize(desktop_png) if os.path.exists(desktop_png) else 0)
    print("Mobile exists:", os.path.exists(mobile_png), "Size:", os.path.getsize(mobile_png) if os.path.exists(mobile_png) else 0)

if __name__ == '__main__':
    main()
