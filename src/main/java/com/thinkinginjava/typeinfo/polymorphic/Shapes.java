package com.thinkinginjava.typeinfo.polymorphic;

import com.thinkinginjava.typeinfo.polymorphic.impl.Circle;
import com.thinkinginjava.typeinfo.polymorphic.impl.Square;
import com.thinkinginjava.typeinfo.polymorphic.impl.Triangle;

import java.util.Arrays;
import java.util.List;

/**
 * 多态的例子
 * created by xuyahui on 2019/3/3
 */
public class Shapes {

    public static void main(String[] args) {
        List<Shape> shapeList = Arrays.asList(
                new Circle(),new Square(),new Triangle()
        );
        for(Shape shape : shapeList){
            shape.draw();
        }
    }

}
