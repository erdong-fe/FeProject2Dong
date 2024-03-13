"use client"
import UrlParse from "url-parse"

export default function Detail() {
    const urlObj = new UrlParse(window.location.href, true);
    debugger
    console.log(urlObj.query);
    return (
        <div className="flex min-h-screen flex-col items-center">
            详情
        </div>
    )
}