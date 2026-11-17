# MuseScore SVG 核验网页

这个页面与 `omr-review/index.html` 和 `v2.html` 独立，显示 `musescore-svg/manifest.csv` 中的第一页面（`*_p0.svg`），左侧为原始 MuseScore SVG，右侧为 Lilylet 草稿的浏览器渲染。自动结果只是**草稿**；结构检查通过或页面能渲染都不代表音符与原图相符。

```sh
npm run omr-review-musescore
python3 -m http.server 37703 --bind 127.0.0.1
# 打开 http://127.0.0.1:37703/omr-review/musescore.html
```

默认读取新版事件图引擎的 staging：`/tmp/omt-musescore-svg-v2/manifest.json`（由 `node --import tsx scripts/svg/batch-to-lilylet.ts --limit 453` 生成，见 `scripts/svg/README.md`）；若不存在则回退到旧版 `/tmp/omt-musescore-svg`。旧版（Starry 适配器）草稿在详情中只读显示以便对照。每张卡片显示质量等级（自洽 / 有标记 / 往返失败）、一致小节数、小节标记和未转写的元素类别——“自洽”只说明小节时值相加正确且 Lilylet 往返一致，不代表与原图相符。转换器代码变更后，旧草稿标记为“草稿哈希不一致/过期”而不再中止构建。读取 `lyl/`、`manual/`；手工转写作为单独条目，不覆盖自动草稿。如使用其他 staging 目录，先运行 `node omr-review/build.mjs` 准备浏览器依赖，再运行 `node omr-review/build-musescore.mjs --staging /path/to/staging`。请在新批次生成后重新构建数据；构建会校验输入和审核草稿的 SHA-256，不匹配时拒绝生成新数据。生成的 `omr-review/musescore-data.js` 和 `vendor/` 均被 git 忽略，不会修改审核账本或生产 Lilylet 文件。

网页支持按文件名/备注搜索、转换状态、审核状态、结构检查和来源过滤，分页显示，只有可见卡片才会尝试 Lilylet 渲染。转换失败的条目直接显示原因，无草稿可渲染。点击详情可查看差异说明、哈希、复制本地路径和 Lilylet 原文。页面只读；修订后的转写应单独保存、验证，再更新相应审核记录。
