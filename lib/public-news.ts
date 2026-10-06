import { getNews, type NewsItem } from './news'

// 公開ページに出すお知らせ。Blob が読めないときはページを落とさず、お知らせ欄を空にする。
export async function listPublicNews(): Promise<NewsItem[]> {
  try {
    return await getNews()
  } catch (error) {
    console.error('公開ページ用のお知らせを Blob から読めなかったため、空で表示します', error)
    return []
  }
}
