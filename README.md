# Git 測試

- <a href="#名詞解釋">名詞解釋</a>
- <a href="#同步方法">同步方法</a>
  - <a href="#pull">pull</a>
  - <a href="#fetch-merge">fetch + merge</a>
  - <a href="#fetch-rebase">fetch + rebase</a>
- <a href="#分支branch">分支(branch)</a>
  - <a href="#提交commit">基本提交(commit)</a>
- <a href="#其他指令">其他指令</a>

## 名詞解釋

- master: 本地分支名(只是一個分支名，開新專案自動幫你創的)
- origin: 遠端
- origin master: 遠端分支
- origin/master: 本地分支
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
- 建立分支: `git branch <branchname>`
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

#### 使用 reset git reset 拆掉 commit，再重新 commit

- 可以先用 `git log --oneline` 查看所有紀錄，或是用`git reflog` 查看所有訊息版本
- `git reset --hard commit_id` 用 --hard 是工作目錄跟暫存區都直接變成指定的版本
- `git push -f` 因為修改已經發生的事實，所以正常來說是推不上去的

#### 使用 git rebase 來修改、合併

- 可以先用 `git log --oneline` 查看所有紀錄，或是用`git reflog` 查看所有訊息版本
- `git rebase -i commit_id` 指定要修改的範圍(目前 ~ 指定的 commit_id)
- 會打開編輯器讓你修改，存檔並離開編輯器，它會開始進行 Rebase


## 其他指令

```sh
git status # 查看目前的狀態

git reflog # 查看所有訊息版本

git log # 查看所有紀錄，越上面越新，enter:往下顯示，q: 離開
git log --oneline # 查看所有紀錄，且簡化成一行來顯示

# reset 使用與參數說明可以參考: https://gitbook.tw/chapters/using-git/reset-commit.html
# reset 這個英文單字的翻譯是「重新設定」，但事實上 Git 的 Reset 指令用中文來說比較像是「前往」或「變成」
# 當執行這個指令的時候：git reset HEAD~2
# 這個指令你原本可能會解讀成「拆掉最後兩次的 Commit」，事實上並沒有真的把 Commit「拆掉」（放心，所有的 Commit 都還在

# reset 後想要直接 push，可以用 git push -f 強制推上去，不過使用強制 push 前要三思

# 參數: --mixed(預設), --soft, --hard ，跟 commit 拆出來的檔案是否會留在工作目錄有關，
# --mixed: 工作目錄不變，暫存區丟掉，--soft: 兩者都不變，--hard: 兩者都丟掉

git reset 
git reset HEAD~ # 回復到上一個提交版本
git reset HEAD~n # 回復之前指定的提交版本，n 等於往上第幾個提交版本
git reset commit_id # 根據 commit id 回覆到指定版本

git revert # 撤銷一個提交的同時會創建一個新的提交，參數用法跟 reset 一樣
```

