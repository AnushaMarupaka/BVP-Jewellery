# Bojja Venkata Prasad Jewellery Works

A free local Flask web application for displaying a jewellery collection with searchable products and detailed pricing.

## Run locally on Windows

1. Open PowerShell in this folder:
   `cd "C:\Users\Venkat\Documents\Anusha Pracs"`
2. Create a virtual environment:
   `py -m venv .venv`
3. Activate it:
   `.venv\Scripts\Activate.ps1`
4. Install the free dependency:
   `python -m pip install -r requirements.txt`
5. Start the app:
   `python app.py`
6. Open `http://127.0.0.1:5000` in your browser.

The product data is in `app.py`. Replace the sample prices, images, address and contact number there with the business's real details. The sample product images are loaded from Unsplash, so an internet connection is needed for those images and Google Fonts; the application itself runs locally and has no paid services.

If your Python installation does not include the `py` launcher, use `python -m venv .venv` instead. Some MSYS Python installations create `.venv\bin` rather than `.venv\Scripts`; in that case run `.venv\bin\python.exe -m pip install -r requirements.txt` and `.venv\bin\python.exe app.py`.

To stop the app, press `Ctrl+C` in PowerShell.
