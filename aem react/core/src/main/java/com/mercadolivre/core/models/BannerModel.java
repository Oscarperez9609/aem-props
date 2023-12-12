package com.mercadolivre.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Model(adaptables = {
        SlingHttpServletRequest.class
}, adapters = {
        ComponentExporter.class
}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = {
        BannerModel.RESOURCE_TYPE
})
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = {
        ExporterConstants.SLING_MODEL_EXTENSION
})
public class BannerModel implements ComponentExporter {

    public static final String RESOURCE_TYPE = "mercadolivre/components/banner";

    @ChildResource(name = "slides", injectionStrategy = InjectionStrategy.OPTIONAL)
    private List<AdvanceSlide> slides;

    private static final Logger LOG = LoggerFactory.getLogger(BannerModel.class);

    public List<AdvanceSlide> getSlides() {
        return this.slides;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}