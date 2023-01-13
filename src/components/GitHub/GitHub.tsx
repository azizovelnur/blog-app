import React, { FC, useEffect } from "react"
import { useSetReposQuery } from "../../store/rtk/github/githubApi"
import { SiJavascript, SiSass, SiTypescript } from "react-icons/si"

const GitHub: FC = () => {
  const { isLoading, isError, data } = useSetReposQuery(null)

  return (
    <aside
      className={
        "asideGrid border-indigo-900 border-solid border-[10px] overflow-y-scroll"
      }
    >
      <div>My Projects</div>

      <div>
        {data?.map((obj) => (
          <div key={obj.id} className={"border-black border-[1px] mb-[20px]"}>
            <div>{obj.full_name}</div>
            <div>{obj.forks}</div>
            <div>{obj.watchers}</div>
            <div>
              <div>{obj.language}</div>
              {(obj.language === "JavaScript" && (
                <SiJavascript className={"fill-yellow-500 h-[40px] w-[40px]"} />
              )) ||
                (obj.language === "TypeScript" && (
                  <SiTypescript className={"fill-blue-500 h-[40px] w-[40px]"} />
                )) ||
                (obj.language === "SCSS" && (
                  <SiSass className={"fill-pink-500 h-[40px] w-[40px]"} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export { GitHub }
