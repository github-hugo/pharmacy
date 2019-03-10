package com.thinkinginjava.typeinfo.polymorphic;

/**
 * created by xuyahui on 2019/3/3
 */
public abstract class Shape {

    void draw(){
        System.out.println(this + ".draw");
    };

    abstract public String toString();
}
