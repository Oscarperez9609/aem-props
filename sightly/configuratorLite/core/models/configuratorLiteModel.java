package com.miniusa.core.models.sling.components.configuratorLite;

import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.miniusa.core.models.pojo.vehicles.Series;
import com.miniusa.core.models.pojo.vehicles.Vehicles;
import com.miniusa.core.services.modelData.modelList.ModelListService;
import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

/**
 * Title is used to be included as a sling component in different html pages.
 */

@Getter
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@Model(adaptables = {
        SlingHttpServletRequest.class,
        Resource.class
        },
        resourceType = ConfiguratorLiteModel.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ConfiguratorLiteModel {
    private final static Logger LOGGER = LoggerFactory.getLogger(ConfiguratorLiteModel.class);
    public static final String RESOURCE_TYPE = "miniusa/components/media/configuratorLite";

    @OSGiService
    private ModelListService modelListService;

    @Self
    private SlingHttpServletRequest slingRequest;

    @Getter
    private Map<String, Series> vehiclesMap;

    /**
     * set up method to initialize  variables.
     * method to initialize variables.
     * @param slingRequest pass SlingHttpServletRequest instance.
     */
    public void init(final SlingHttpServletRequest slingRequest) {
        this.slingRequest = slingRequest;
        this.init();
    }

    @PostConstruct
    public void init() {
        try {
            Vehicles vehicles = modelListService.getModelList();
            ObjectMapper mapper = new ObjectMapper();
            vehiclesMap = new HashMap<>();
            vehiclesMap = mapper.readValue(new Gson().toJson(vehicles), HashMap.class);
            LOGGER.debug("ConfiguratorLiteModel-> vehiclesMap: {}", vehiclesMap);
        } catch (Exception e) {
            LOGGER.error("ConfiguratorLiteModel_error: "+e);
        }
    }
}
