interface IParams {
    email: string;
}

export interface INavigation {
    navigate: (pathd: string, params?: IParams) => void;
    goBack: () => void;
    setOptions: (options: any) => void;
}
