// バリデーションをzodで管理する！

import { z } from "zod";

export const transactionSchema = z.object({
    // タイプのバリデーションチェック
    type: z.enum(["income", "expense"]),
    // 日付のバリデーションチェック。文字型で入力してほしいからstring、必須にしたいからmin(1)→「最低でも１は入力」
    date: z.string().min(1, {message: "日付は必須です。"}),
    // 金額はnumber型で。number型の場合、「1以上の数字を入力してね」
    amount: z.number().min(1, {message: "金額は1円以上でn百合卯力してください。"}),
    // 内容
    content: z.string().min(1, {message: "内容を入力してください。"}).max(50, {message: "内容は50文字以内で入力してください。"}),
    //カテゴリ
    category: z.union([
        z.enum(["食費", "日用品", "住居費", "交際費", "娯楽", "交通費", "病院", "その他"]),
        z.enum(["給与", "副収入", "お小遣い"]),
        z.literal(""), // 空文字が万が一送られた場合バリデーションチェックしたいから
    ]).refine((val) => val !== "", {message: "カテゴリを選択してください"}),
});

// スキーマに基づいたタイプスクリプトの型を生成
export type Schema = z.infer<typeof transactionSchema>