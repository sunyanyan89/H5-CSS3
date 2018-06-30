# 常用命令

> **git log** 命令显示从最近到最远的提交日志
>
> **git log --pretty=oneline**
>
> --pretty指定使用完全不同于默认格式的方式展示提交历史。比如用oneline 将 每个提交 放在一行显示，这在提交数很大时非常有用
>
> **git status** 状态查看
>
> **git add** 把工作区添加到暂存区
>
> **git commit -m 'remark'** 把暂存区内容提交到本地仓库
>
> **git push origin master** 把本地master分支推送到远程库origin
>
> 关联一个远程库，使用命令`git remote add origin git@server-name:path/repo-name.git`
>
> 关联后，使用命令`git push -u origin master`第一次推送master分支的所有内容
>
> 此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改
>
> **git checkout -b devgit checkout** 命令加上-b参数表示创建并切换，相当于以下两个命令
>
> **git branch dev** 新建dev分支
>
> **git checkout dev** 切换到dev分支
>
> **git branch** 查看当前分支
>
> **git checkout master** 切换回master分支，才能合并分支
>
> **git merge dev** 合并指定分支到当前分支
>
> **git branch -d dev** 删除dev分支
>
> **git remote** 查看远程库的信息
>
> **git tag v1.1** 给当前版本打一个标签
>
> **git tag** 查看当前所有标签

## 创建版本库

> 1.首先选择一个合适的地方，创建一个空目录
>
> `mkdir mygit`
>
> `cd mygit`
>
> 2.通过git init 把这个目录变成git可以管理的目录
>
> `git init`
>
> 此时就建好了一个空的git仓库

## 版本管理

> 1.版本回退
>
> `git reset --hard HEAD^`
>
> 在Git中，用HEAD表示当前版本，也就是最新的提交（注意每个人的提交ID肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。

## 分支管理

> 创建并切换分支
>
> `git checkout -b dev`
>
> git checkout 命令加上-b参数表示创建并切换 相当于以下两条命令
>
> `git branch dev`
> `git checkout dev`
>
> 查看分支
>
> `git branch`  查看所有本地分支，当前分支前面会标一个*号
>
> `git branch -r`  查看所有远程分子
>
> `git branch -a`  查看所有本地分支和远程分支
>
> `git branch -v`  查看每个分支的最后一个提交，展示commit id
>
> 删除分支
>
> `git branch -d dev`
> `git branch -D dev`  加-D参数，强行删除分支