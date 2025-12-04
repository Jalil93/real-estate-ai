from redfin_scraper import RedfinScraper







def main():
    scraper = RedfinScraper()
    scraper.setup('/Users/jalilmuhammad/WebstormProjects/real-estate-ai/src/whimsical_startup/zip_code_database.csv', True)

    scrapeResult = scraper.scrape(['Chantilly, VA'], ['20151'], False, '1mo', 1.5, 1.5)
    print(scrapeResult)
if __name__ == "__main__":
    main()