package com.thinkinginjava.typeinfo.classload;

/**
 * Class加载的例子
 * created by xuyahui on 2019/3/3
 */
public class SweetShop {

    public static void main(String[] args) {
        System.out.println("inside main");
        new Candy();
        System.out.println("after creating Candy");

        try {
            // 加上类的完整包名就可以找到了
            Class clazz =  Class.forName("com.thinkinginjava.typeinfo.classload.Gum");
            System.out.println(clazz.getSimpleName());
            System.out.println(clazz.getClassLoader());
        } catch (ClassNotFoundException e) {
            System.out.println("can not find Gum");
        }

        System.out.println("after Class.forName('Gum')");
        new Cookie();
        System.out.println("after creating Cookie");
    }

}
