import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
// import puppeteer from "puppeteer";

// async function scrapeData(url:string){
//     try{
//         const
//     }
// }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url)
    return NextResponse.json("No url found, please provide", { status: 404 });
  // check if url is array or is there single url
  //   const singleUrl: string = Array.isArray(url) ? url[0] : url;
  console.log(url);

  //   try {
  //     const browser = await puppeteer.launch({
  //         args: ['--no-sandbox', '--disable-setuid-sandbox'],
  //     });
  //     const page = await browser.newPage();
  //     page.setDefaultNavigationTimeout(60000);
  //     //navigate to target url
  //     await page.goto(url);
  //     const data = page.evaluate(() => {
  //       const items = Array.from(
  //         document.querySelectorAll(".gs-c-promo-heading__title")
  //       );
  //       return items.map((item) => item.textContent);
  //     });

  //     await browser.close();
  try {
    // Fetch the HTML content
    const { data } = await axios.get(url);

    // Load HTML into Cheerio
    const $ = cheerio.load(data);

    // Example: Scrape the main headlines (adjust the selector based on the website structure)
    const headlines:any = [];
    $("a").each((index, element) => {
      const headline = $(element).text();
      headlines.push(headline);
    });

    return NextResponse.json(headlines, { status: 200 });
  } catch (err) {
    return NextResponse.json("Cannot scrape data" + err, { status: 400 });
  }
}
