import ProjectCard from "./components/ProjectCard";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="grid gap-4 grid-cols-2">
        <ProjectCard
          projectName="01 折角按钮"
          projectDesc="使用React实现按钮多位置的折角"
          projectPath="FoldButton"
        />
        <ProjectCard
          projectName="02 小红书PC端布局"
          projectDesc="使用React模仿实现小红书PC端网页"
          projectPath="XiaohongshuPC"
        />
      </div>
    </main>
  )
}
