@echo off
title StoryGrid Media SEO Auditor
echo ==============================================
echo [1/3] Fetching and rendering webpage...
echo ==============================================
python "%USERPROFILE%\.claude\skills\seo\scripts\render_page.py" https://storygridmedia.in --mode always --output temp.html

echo.
echo ==============================================
echo [2/3] Analyzing SEO factors...
echo ==============================================
python "%USERPROFILE%\.claude\skills\seo\scripts\parse_html.py" temp.html --url https://storygridmedia.in --json > temp_seo.json

echo.
echo ==============================================
echo [3/3] Compiling AUDIT-REPORT.md...
echo ==============================================
python compile-report.py

echo.
echo Cleaning up temporary files...
del temp.html
del temp_seo.json

echo.
echo ==============================================
echo Audit Complete! Opening AUDIT-REPORT.md...
echo ==============================================
start AUDIT-REPORT.md
