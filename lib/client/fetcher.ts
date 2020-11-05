// eslint-disable-next-line no-unused-vars
type PostType = <D, R>(url: string, data: D) => Promise<R>;

export const Post: PostType = async (url: string, data) => {
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    });
    return await res.json();
};
