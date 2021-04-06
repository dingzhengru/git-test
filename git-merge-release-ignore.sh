# 參考 https://stackoverflow.com/a/16455853/5134658
# 合併檔案時略過指定檔案
git merge --no-ff --no-commit release
git reset HEAD src/settings-no-merge.js
git checkout -- src/settings-no-merge.js
git commit -m "merged release"