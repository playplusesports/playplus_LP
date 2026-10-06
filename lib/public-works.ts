import { getWorks, type WorkItem } from './works'
import { CODE_MANAGED_WORKS, codeManagedWorksNotIn } from './works-code-managed'

// 公開ページに出す実績。管理画面（Blob）にまだ取り込まれていないコード管理分を先頭に足す。
// Blob が読めないときはページを落とさず、コード管理分だけを出す。
export async function listPublicWorks(): Promise<WorkItem[]> {
  try {
    const storedWorks = await getWorks()
    return [...codeManagedWorksNotIn(storedWorks), ...storedWorks]
  } catch (error) {
    console.error('公開ページ用の実績を Blob から読めなかったため、コード管理分だけを表示します', error)
    return [...CODE_MANAGED_WORKS]
  }
}
