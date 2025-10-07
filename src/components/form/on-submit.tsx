import { postData, putData } from "@/utils/requests/dataQuery";

interface SubmitOptions<T> {
  values: T;
  id?: string;
  edit?: boolean;
  apiBasePath: string;
  messages: {
    editTitle: string;
    addTitle: string;
  };
  onLoadingChange?: (loading: boolean) => void;
}

export async function submit<T>(
  options: SubmitOptions<T>
) {
  const {
    values,
    id,
    edit = false,
    apiBasePath,
    messages,
    onLoadingChange
  } = options;

  const url = edit && id ? `${apiBasePath}/${id}` : apiBasePath;
  const payload = edit && id ? { ...values, id } : values;

  try {
    onLoadingChange?.(true);

    if (edit && id) {
      await putData({
        title: messages.editTitle,
        url,
        values: payload
      });
    }

    if (!edit) {
      await postData({
        title: messages.addTitle,
        url,
        values: payload
      });
    }
  } finally {
    onLoadingChange?.(false);
  }
}