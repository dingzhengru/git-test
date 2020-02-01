# Git 測試
*  <a href="#名詞解釋">名詞解釋</a>
*  <a href="#同步方法">同步方法</a>
    *  <a href="#pull">pull</a>
    *  <a href="#fetch-merge">fetch + merge</a>
    *  <a href="#fetch-rebase">fetch + rebase</a>
*  <a href="#分支branch">分支(branch)</a>
*  <a href="#提交commit">提交(commit)</a>


## 名詞解釋
*  master: 本地分支名(只是一個分支名，開新專案自動幫你創的)
*  origin: 遠端
*  origin master: 遠端分支
*  origin/master: 本地分支
*  使用範例: 
    *  ```git fetch origin master```: 取得遠端分支 master 的資料
    *  ```git merge origin/master```: 合併本地分支 origin/master 的程式碼
    *  ```git push origin master```: 將本地提交推至遠端分支 master
## 同步方法
*  pull
*  fetch + merge (將 pull 做的事，分成兩步驟，"取得" & "同步")
*  fetch + rebase (rebase:另一種合併方式，會修改到歷史紀錄)

### pull

### fetch + merge

### fetch + rebase

## 分支(branch)
*  分支是為了將修改記錄的整體流程分開儲存，讓分開的分支不受其他分支的影響
*  查看分支: ```git branch```
*  建立分支: ```git branch <branchname>```
*  切換分支: ```git checkout <branch>```
*  合併分支: ```git merge <branch>``` (依你現在所在的 branch 去合併)
*  刪除分支: ```git branch -d <branch>```


## 提交(commit)
*  基本提交: ```git commit -m "commit content"```
*  分支是為了將修改記錄的整體流程分開儲存，讓分開的分支不受其他分支的影響。
