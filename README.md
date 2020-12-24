- [名詞解釋](#名詞解釋)
- [同步方法](#同步方法)
- [分支(branch)](#分支branch)
  - [合併分支](#合併分支)
- [提交(commit)](#提交commit)
  - [基本提交](#基本提交)
  - [修改 commit](#修改-commit)
    - [使用 --amend 參數來修改最後一次的 commit](#使用---amend-參數來修改最後一次的-commit)
- [reset](#reset)
  - [使用 reset 拆掉 commit，再重新 commit](#使用-reset-拆掉-commit再重新-commit)
- [列出一些指令](#列出一些指令)
- [remote](#remote)
  - [如何設定一次 Push 至多個 Remote Repository](#如何設定一次-push-至多個-remote-repository)

參考: https://gitbook.tw/

## 名詞解釋

- master: 本地分支名(只是一個分支名，開新專案自動幫你創的)
- origin: 遠端
- origin master: 遠端分支
- origin/master: 本地分支
- HEAD: 是一個指標，指向某一個分支，通常你可以把 HEAD 當做「目前所在分支」看待
- 使用範例:
  - `git fetch origin master`: 取得遠端分支 master 的資料
  - `git merge origin/master`: 合併本地分支 origin/master 的程式碼
  - `git push origin master`: 將本地提交推至遠端分支 master

## 同步方法

- pull: 預設是 fetch + merge，想用 rebase 可以 `git pull --rebase`
- fetch + merge (將 pull 做的事，分成兩步驟，"取得" & "同步")
- fetch + rebase (rebase:另一種合併方式，會修改到歷史紀錄)

## 分支(branch)

- 分支是為了將修改記錄的整體流程分開儲存，讓分開的分支不受其他分支的影響
- 查看分支: `git branch`
- 建立分支: `git branch <branch-name>`
- 切換分支: `git checkout <branch>`
- 合併分支: `git merge <branch>` 或是 `git rebase <branch>` (依你現在所在的 branch 去合併)
- 刪除分支: `git branch -d <branch>`
- 建立分支是依你目前所在的分支狀態，複製並建立起來的(看你建立時有甚麼檔案，新建立的分支就有甚麼)

### 合併分支

- `git merge <branch>` 或是 `git rebase <branch>`
- 合併的規則
  - 建立分支時的檔案，若在新分支時刪除，則合併時會直接刪除
  - 建立分支之後才新增的檔案，則會保留
  - 重複的檔案則會用提醒字串的方式放在一起

## 提交(commit)

### 基本提交

- 新增、修改、刪除檔案: `git add -A` 或 `git add --all`
- 提交: `git commit -m "commit content"`
- 上傳: `git push`
- 強制上傳: `git push -f`，這指令很可怕，參考: https://gitbook.tw/chapters/github/using-force-push.html
- 分支是為了將修改記錄的整體流程分開儲存，讓分開的分支不受其他分支的影響。

### 修改 commit

- 參考 https://gitbook.tw/chapters/using-git/amend-commit1.html
- 有三種方法
  1. 使用 --amend 參數來修改**最後一次**的 commit
  2. 先把 commit 用 git reset 拆掉，整理後再重新 commit
  3. 使用 git rebase 來修改歷史

#### 使用 --amend 參數來修改最後一次的 commit

- 可以先用 `git log --oneline` 查看所有紀錄
- 修改最後一次的 commit 訊息 `git commit --amend -m "Welcome To Facebook"`
- 雖然說是修改，但實際只是產生一個新的 commit 在其上面而已，**原本的紀錄還是存在**
- **請記得，雖然這只是改訊息，不管如何它就是修改了一次的歷史，所以請儘量不要在已經 Push 出去之後再修改，否則可能會造成其它人的困擾。**

## reset

參考: https://git-scm.com/docs/git-reset
checkout 與 reset 的比較，可以參考: [文章](https://medicineyeh.wordpress.com/2015/01/22/%E7%B4%B0%E8%AA%AAgit-reset%E5%92%8Cgit-checkout%E7%9A%84%E4%B8%8D%E5%90%8C%E4%B9%8B%E8%99%95)

git-reset: Reset current HEAD to the specified state

修改當前分支(HEAD)所指的 commit，並刪除該 commit 後的紀錄

### 使用 reset 拆掉 commit，再重新 commit

參考: https://gitbook.tw/chapters/using-git/reset-commit.html

- 可以先用 `git log --oneline` 查看所有紀錄，或是用`git reflog` 連被刪除的紀錄也會顯示
- `git reset --hard commit_id` 用 --hard 是工作目錄跟暫存區都直接變成指定的版本
- `git push -f` 因為修改已經發生的事實，所以正常來說是推不上去的

## 列出一些指令

```sh
git status # 查看目前的狀態

git reflog # 查看所有訊息版本 (包含 reset 過後，被刪除的那些 commit)

git log # 查看所有紀錄，越上面越新，enter:往下顯示，q: 離開
git log --oneline # 查看所有紀錄，且簡化成一行來顯示
```

## remote

參考: https://blog.yowko.com/git-push-multiple-remote-repository
參考: https://git-scm.com/docs/git-remote

`git remote` 會列出現在所有的 remote 群組，通常會有預設的 origin  
`git remote -v` 會列出詳細資訊，包含裡面設定的 fetch, push

remote 裡可以設定一個 fetch 與 多個 push

新增 remote
`git remote add origin [remote-url]`

刪除 remote

`git remote remove origin`

push 指定的 remote (假設有個 remote 叫 code-commit)，預設通常會是 origin

`git push code-commit`

### 如何設定一次 Push 至多個 Remote Repository

指定一個 remote，新增 push remote url (沒有 --push 的話，會是 fetch)

`git remote set-url --add --push origin https://gitserver/repository.git`

指定一個 remote，修改 push remote url (沒有加上 --add 就會是修改)
`git remote set-url --push origin https://gitserver/repository.git`
