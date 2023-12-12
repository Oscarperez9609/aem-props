package com.mercadolivre.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Button {

    public Button(){}

    @ValueMapValue
    private String text;

    @ValueMapValue
    private String link;

    @ValueMapValue
    private String color;

    @ValueMapValue
    private String background;

    @ValueMapValue
    private String border;

    @ValueMapValue
    private String hoverColor;

    @ValueMapValue
    private String hoverBackground;

    @ValueMapValue
    private String hoverBorder;

    public String getText() {
        return text;
    }

    public String getLink() {
        return link;
    }

    public String getColor() {
        return color;
    }

    public String getBackground() {
        return background;
    }

    public String getBorder() {
        return border;
    }

    public String getHoverColor() {
        return hoverColor;
    }

    public String getHoverBackground() {
        return hoverBackground;
    }

    public String getHoverBorder() {
        return hoverBorder;
    }
}
