import './globals.css'

export const metadata = {
  title: '程序员耳东的React项目主页',
  description: '看到所有的React项目，点击进入项目详情页',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
