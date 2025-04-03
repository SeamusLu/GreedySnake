// ����һ����
const path = require('path');
// ����html���
const HTMLWebpackPlugin = require('html-webpack-plugin');
// ����clean���
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack�е����е�������Ϣ��Ӧ��д��module.exports��
module.exports = {
    // ָ������ļ�
    entry: "./src/index.ts",

    // ָ������ļ�����Ŀ¼
    output: {
        // ָ������ļ���Ŀ¼
        path: path.resolve(__dirname, 'dist'),
        // ������ļ����ļ�
        filename: "bundle.js",

        // ����webpack��ʹ�ü�ͷ
        environment: {
            arrowFunction: false,
            // ��ʹ��const,��ʱ����IE 10
            const: false
        }
    },

    // ָ��webpack���ʱҪʹ��ģ��
    module: {
        // ָ��Ҫ���صĹ���
        rules: [
            {
                // testָ�����ǹ�����Ч���ļ�
                test: /\.ts$/,
                // Ҫʹ�õ�loader
                use: [
                    // ����babel
                    {
                        // ָ��������
                        loader: "babel-loader",
                        // ����babel
                        options: {
                            // ����Ԥ����Ļ���
                            presets: [
                                [
                                    // ָ�������Ĳ��
                                    "@babel/preset-env",
                                    // ������Ϣ
                                    {
                                        // Ҫ���ݵ�Ŀ�������
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        // ָ��corejs�İ汾
                                        "corejs": "3",
                                        // ʹ��corejs�ķ�ʽ "usage" ��ʾ�������
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // Ҫ�ų����ļ�
                exclude: /node-modules/
            },

            // ����less�ļ��Ĵ���
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",

                    // ����postcss
                    // ������babel����css�﷨ת�����ݾɰ���������﷨
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        // ��������ݲ��
                                        "postcss-preset-env",
                                        {
                                            // ÿ����������������汾
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    // ����Webpack���
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "����һ���Զ����title"
            template: "./src/index.html"
        }),
    ],

    // ������������ģ��
    resolve: {
        extensions: ['.ts', '.js']
    }

};