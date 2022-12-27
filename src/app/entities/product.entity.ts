export interface PropsProductEntity {
    id?: number | null
    name: string
    price: number,
    amount: number
    category: string
}

export class Product {
    private props: PropsProductEntity;

    constructor(props: PropsProductEntity) {
        this.props = props;
    }

    public get id() {
        return this.props.id;
    }

    public get name(): string {
        return this.props.name;
    }
    public set name(name: string) {
        this.props.name = name;
    }

    public get price(): number {
        return this.props.price;
    }
    public set price(price: number) {
        this.props.price = price;
    }

    public get amount(): number {
        return this.props.amount;
    }
    public set amount(amount: number) {
        this.props.amount = amount;
    }

    public get category(): string {
        return this.props.category;
    }
    public set category(category: string) {
        this.props.category = category;
    }
}