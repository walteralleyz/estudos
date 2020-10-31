const Article = ({ children, bgClass }) => (
    <article className={`d-flex flex-column _article ${bgClass}`}>
        {children}
    </article>
);

export default Article;