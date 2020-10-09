public class JBean {
    private int height, width, depth, density;

    public JBean setHeight(int h) {
        this.height = h;
        return this;
    }

    public JBean setWidth(int w) {
        this.width = w;
        return this;
    }

    public JBean setDepth(int d) {
        this.depth = d;
        return this;
    }

    public JBean setDensity(int d) {
        this.density = d;
        return this;
    }
}