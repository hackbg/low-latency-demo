export const networkConfig: Record<
    string,
    {
        usdc: string;
        avax: string;
        link: string;
        weth: string;
        verifier: string;
        proxy: string;
        router: string;
        feedsId: Record<string, string>;
    }
> = {
    "421614": {
        usdc: "0x2b4342D1bd410538D910298f01Cd0E3c02FF809B",
        avax: "0x29F18736122bEeF5ddadEB04A6efc138b7f9faD0",
        link: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
        verifier: "0x2ff010DEbC1297f19579B4246cad07bd24F2488A",
        proxy: "0xF54D570E247B1F62e5c3dEc11510751b37D451cA",
        weth: "0x0EaF6646bEB05Ea2463BE89319ff5D757AB327Fe",
        router: "0x3d2c382885242454b69df2AEf554c313141A3735",
        feedsId: {
            "weth-usdc":
                "0x00029584363bcf642315133c335b3646513c20f049602fc7d933be0d3f6360d3",
            "avax-usdc":
                "0x0002c407f448ffe50a15fd5f1ffe4791830c5f8fa39cd971a3d6ae337aef51a0",
        },
    },
};
