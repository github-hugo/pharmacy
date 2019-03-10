package com.thinkinginjava.typeinfo.classmethod;

/**
 * created by xuyahui on 2019/3/3
 */
public class ToyTest {

    static void printInfo(Class clazz){
        System.out.println(
                "Class name:" + clazz.getName() + " is interface?[" + clazz.isInterface()+"]");
        System.out.println(
                "Simple name:" + clazz.getSimpleName());
        System.out.println("Canonical name:" + clazz.getCanonicalName());
    }

    public static void main(String[] args) {
        Class c = null;
        try {
            c = Class.forName("com.thinkinginjava.typeinfo.classmethod.FancyToy");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            System.exit(1);
        }
        printInfo(c);

        for(Class clz : c.getInterfaces()){
            printInfo(clz);
        }
        Class up = c.getSuperclass();
        Object obj = null;
        try {
            obj = up.newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
            System.exit(1);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
            System.exit(1);
        }
        printInfo(obj.getClass());

    }


}
