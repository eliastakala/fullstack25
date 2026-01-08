const BlogForm = (
{ 
onSubmit,
changeTitle,
valueTitle,
changeAuthor,
valueAuthor,
changeUrl,
valueUrl
}
) => (
<form onSubmit={onSubmit}>
    <div>
    <label>
        title:
        <input
        value={valueTitle}
        onChange={changeTitle}
        />
    </label>
    </div>
    <div>
    <label>
        author:
        <input
        value={valueAuthor}
        onChange={changeAuthor}
        />
    </label>
    </div>
    <div>
    <label>
        url:
        <input
        value={valueUrl}
        onChange={changeUrl}
        />
    </label>
    </div>
    <button type="submit">save</button>
</form>
)

export default BlogForm