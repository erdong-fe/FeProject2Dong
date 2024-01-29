export const metadata = {
  title: 'React项目详情',
  description: '实时预览单个React项目',
}

export default function Layout({ children }) {
  return (
    <div className="project-detail">
      {children}
    </div>
  )
}

